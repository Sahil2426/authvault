const validate = (zodSchema) => {
  return (req, res, next) => {
    const result = zodSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
};

export default validate;
