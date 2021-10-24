export const VerifyForm = {
    name: [
        { required: true, message: "请输入名称", trigger: "blur" },
        { min: 2, max: 25, message: "长度在 2 到 5 个字符", trigger: "blur" }
    ],
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" }
    ],
    title: [
        { required: true, message: "请输入称号", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
    ],
    categories: [{ required: true, message: "请输入类型", trigger: "blur" }]
}
