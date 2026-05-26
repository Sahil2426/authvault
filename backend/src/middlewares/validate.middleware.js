const validate = (zodSchema) => {
  return (req, res, next) => {
    const result = zodSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }

    req.body = result.data;

    next();
  };
};

export default validate;
