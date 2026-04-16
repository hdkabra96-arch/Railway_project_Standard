import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(express.json());

const DB_FILE = path.join(process.cwd(), 'db.json');
const TMP_DB_FILE = '/tmp/db.json';

async function readDB() {
  try {
    // On Vercel, try to read from /tmp first to get any modifications
    if (process.env.VERCEL) {
      try {
        const tmpData = await fs.readFile(TMP_DB_FILE, 'utf-8');
        return JSON.parse(tmpData);
      } catch (e) {
        // If /tmp doesn't exist, read from the read-only bundled db.json
        const data = await fs.readFile(DB_FILE, 'utf-8');
        return JSON.parse(data);
      }
    }
    
    // Local environment
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return { services: [], projects: [], certifications: "", contacts: [] };
  }
}

async function writeDB(data: any) {
  try {
    if (process.env.VERCEL) {
      // Vercel has a read-only filesystem, so we write to /tmp
      // Note: This data will be lost when the serverless function spins down!
      await fs.writeFile(TMP_DB_FILE, JSON.stringify(data, null, 2));
    } else {
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('Failed to write DB:', e);
  }
}

// --- API ROUTES ---

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/data', async (req, res) => {
  const db = await readDB();
  res.json(db);
});

app.get('/api/projects', async (req, res) => {
  const db = await readDB();
  res.json(db.projects);
});

app.post('/api/projects', async (req, res) => {
  const db = await readDB();
  const newProject = { id: Date.now().toString(), ...req.body };
  db.projects.push(newProject);
  await writeDB(db);
  res.json(newProject);
});

app.put('/api/projects/:id', async (req, res) => {
  const db = await readDB();
  const index = db.projects.findIndex((p: any) => p.id === req.params.id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...req.body };
    await writeDB(db);
    res.json(db.projects[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  const db = await readDB();
  db.projects = db.projects.filter((p: any) => p.id !== req.params.id);
  await writeDB(db);
  res.json({ success: true });
});

app.get('/api/services', async (req, res) => {
  const db = await readDB();
  res.json(db.services);
});

app.post('/api/services', async (req, res) => {
  const db = await readDB();
  const newService = { id: Date.now().toString(), ...req.body };
  db.services.push(newService);
  await writeDB(db);
  res.json(newService);
});

app.put('/api/services/:id', async (req, res) => {
  const db = await readDB();
  const index = db.services.findIndex((s: any) => s.id === req.params.id);
  if (index !== -1) {
    db.services[index] = { ...db.services[index], ...req.body };
    await writeDB(db);
    res.json(db.services[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  const db = await readDB();
  db.services = db.services.filter((s: any) => s.id !== req.params.id);
  await writeDB(db);
  res.json({ success: true });
});

app.get('/api/certifications', async (req, res) => {
  const db = await readDB();
  res.json({ text: db.certifications });
});

app.put('/api/certifications', async (req, res) => {
  const db = await readDB();
  db.certifications = req.body.text;
  await writeDB(db);
  res.json({ success: true });
});

app.get('/api/contacts', async (req, res) => {
  const db = await readDB();
  res.json(db.contacts);
});

app.post('/api/contacts', async (req, res) => {
  const db = await readDB();
  const newContact = { id: Date.now().toString(), date: new Date().toISOString(), ...req.body };
  db.contacts.push(newContact);
  await writeDB(db);
  res.json(newContact);
});

export default app;
