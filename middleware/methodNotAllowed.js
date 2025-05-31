export default async function methodNotAllowed(req, res) {
  res.status(405).json({ error: `Método ${req.method} no permitido en esta ruta` });
}
