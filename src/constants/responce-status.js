export const STATUS_RESET_PASSWORD = {
    200: {
        title: 'Новые данные сохранены',
        info: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
        buttonText: 'ВХОД',
    },
    400: {
        title: 'Данные не сохранились',
        info: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'ПОВТОРИТЬ',
    },
    default: {
        title: 'ОШИБКА',
        info: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'ПОВТОРИТЬ',
    }
};

export const STATUS_AUTH = {
    default: {
        title: 'Вход не выполнен',
        info: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'ПОВТОРИТЬ',
    },
};