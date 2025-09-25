# Modify-Cli

> 可以不造轮子，但要知道怎么造

Modify-Cli is a command line tool for modifying files.

## Installation

```bash
npm install -g modify-cli
```

## Usage

```bash
modify-cli create <project-name>
```

## 完整的生命周期

```mermaid
sequenceDiagram
participant User as "用户"
participant CLI as "CLI程序"
participant FS as "文件系统"
participant Inquirer as "交互组件"
participant Git as "Git克隆"
participant Terminal as "终端输出"
User->>CLI : modify-cli create my-project
CLI->>FS : 检查目标路径是否存在
FS-->>CLI : 返回检查结果
alt 路径已存在
CLI->>Inquirer : 显示覆盖确认对话框
Inquirer-->>CLI : 用户选择
alt 用户选择覆盖
CLI->>FS : 删除现有目录
else 用户选择取消
CLI->>Terminal : 输出错误信息并退出
end
end
CLI->>Inquirer : 显示技术栈选择
Inquirer-->>CLI : 返回技术栈和TS选择
CLI->>Git : 根据选择调用gitClone
Git-->>CLI : 返回克隆结果
alt 克隆成功
CLI->>FS : 清理.git和.github目录
CLI->>Terminal : 输出安装和运行指令
CLI->>Terminal : 显示ASCII艺术字
else 克隆失败
CLI->>Terminal : 输出错误信息
end
```
