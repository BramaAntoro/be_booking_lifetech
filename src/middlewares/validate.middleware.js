export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = JSON.parse(result.error.message);
      return res.status(400).json({
        status: "fail",
        message: issues[0]?.message ?? "Validasi gagal",
      });
    }
    req.body = result.data;
    next();
  };
}