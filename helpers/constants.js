const limiterAPI = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      message:
        'Пользователь отправил слишком много запросов за последнее время',
    })
  },
}

module.exports = limiterAPI;