// Complete the Index page component here
// Use chakra-ui
import React from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isComplete: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  };

  return (
    <Box p={5}>
      <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={addTask} mt={2} colorScheme="blue">Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon as={task.isComplete ? FaCheckCircle : FaTrash} color={task.isComplete ? 'green.500' : 'red.500'} cursor="pointer" onClick={() => toggleComplete(task.id)} />
            <Box flex="1" as="span" textDecoration={task.isComplete ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;