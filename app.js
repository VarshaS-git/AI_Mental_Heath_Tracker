const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

// Initialize Express and configure bodyParser
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',          // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'loginm',        // Replace with your database name
    password: 'varsha123',     // Replace with your PostgreSQL password
    port: 5432,
});

// Root route to serve the registration page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { name, email, password, date_of_birth, gender, country } = req.body;

    try {
        // Convert date_of_birth to YYYY-MM-DD format
        const [day, month, year] = date_of_birth.split('/');
        const formattedDate = `${year}-${month}-${day}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name, email, password, date_of_birth, gender, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, hashedPassword, formattedDate, gender, country]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                date_of_birth: user.date_of_birth,
                country: user.country,
                gender: user.gender,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Route to serve the profile page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Route to add a task to the todo table
app.post('/todo', async (req, res) => {
    const { user_id, task } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO todo (user_id, task) VALUES ($1, $2) RETURNING *',
            [user_id, task]
        );

        res.status(201).json({ message: 'Task added successfully', task: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding task' });
    }
});

// Route to get all tasks for a specific user
app.get('/todo/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM todo WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }

        res.status(200).json({ tasks: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Route to delete a task from the todo table
app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM todo WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
