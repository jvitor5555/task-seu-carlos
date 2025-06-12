const Task = require('../models/task')

exports.createTask = async (req, res) => {

   try {
       const { title, description } = req.body
       console.log(title, description)

       const userId = req.usuario.id
       console.log(userId)

       if (!userId) {

           return res.status(401).json({ error: 'Acesso negado' })
       }

       if (!title || !description) {

           return res.status(400).json({ error: 'Dados obrigatórios faltando' })
       }

       const task = await Task.create({
           title,
           description,
           userId
       })

       return res.status(201).json({ message: "Tarefa criada com sucesso", info: task})
       
    } catch (error) {
       console.error('Erro ao criar tarefa:', error);
       return res.status(500).json({ error: 'Erro interno ao registrar a tarefa' });
    }

}


exports.listarTasks = async (req, res) => {
    
    try {
        
        const userId = req.usuario.id
        console.log(userId)

        if (!userId) {

            return res.status(401).json({ error: 'Acesso negado' });
        }

        const task = await Task.findAll({
            where: { userId: userId }
        });

        return res.status(200).json({message: 'Tarefas encontradas com sucesso', data: task})

    } catch (error) {

        console.error('Erro ao listar tarefas:', error);
        return res.status(500).json({ error: 'Erro interno ao listar a tarefa' });
        
    }
}

exports.atualizartasks = async (req, res) => {

    try {

        const { id } = req.params

        if (!id || id ==='' || id.trim() === '') {
            return res.json({message: "id da tarefa é obrigatorio"})
        }
        
        const { title, description, completed } = req.body
        console.log(title, description)

        const userId = req.usuario.id // id do user
        console.log(userId)

        if (!userId) {

            return res.status(401).json({ error: 'Acesso negado' })
        }

        if (title === undefined && description === undefined && completed === undefined) {
            return res.status(400).json({ error: 'Informe pelo menos um campo para atualizar' })
        }

        const task = await Task.findOne({
            where: { id: id, userId: userId }
        })

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada'})
        }

        if (userId !== task.userId) {
            return res.status(401).json({ error: 'Acesso negado' })
        }

        task.title = title || task.title
        task.description = description || task.description

        if (completed !== undefined) {
            task.completed = completed;
        }
        
        await task.save();

        return res.status(200).json({message: 'Tarefa atualizada com sucesso'})

    } catch (error) {
        
        console.error('Erro ao atualizar tarefa:', error);
        return res.status(500).json({ error: 'Erro interno ao atualizar a tarefa' });
    }
}

exports.excluirTask = async (req, res) => {

    const { id } = req.params;

    if (!id || id.trim() === '') {
        return res.status(400).json({ message: "ID da tarefa é obrigatório" });
    }

    const userId = req.usuario.id;
    console.log(userId);

    if (!userId) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    const task = await Task.findOne({
        where: { id: id, userId: userId }
    });

    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.destroy();

    return res.status(200).json({ message: 'Tarefa excluída com êxito' });
};
