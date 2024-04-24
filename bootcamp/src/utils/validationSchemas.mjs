export const createuserValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage:
                "username must be at least 5 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string",
        },
    }
};
