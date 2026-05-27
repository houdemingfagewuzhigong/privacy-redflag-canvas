# Privacy Redflag Canvas

[English README](README.md)

把隐私政策变成红旗清单、证据表和可打印分析画布，适合法律科技教学、社会科学研究和大学生创新创业项目申报。

![Privacy Redflag Canvas demo](assets/demo.svg)

> 免责声明：本项目仅用于教育和研究，不构成法律建议，不能替代律师、监管机构或其他专业人士。

## 为什么有用

普通用户很少真正读完隐私政策，因为这些文本通常很长、很模糊，也很难比较。Privacy Redflag Canvas 可以帮助法学生、记者、公益组织、社科学生和消费者权益教育者快速发现值得追问的条款。

## 功能

- 浏览器内运行的隐私政策扫描器
- 红旗风险评分和分类图表
- 带匹配短语和追问问题的证据表
- JSON 导出，方便研究记录
- 可打印报告
- Demo 图和大学生创新创业项目申报书

## 快速开始

直接用浏览器打开 `index.html`，或启动本地静态服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 适用场景

- 法学生比较不同 App 的隐私政策
- 社会科学课堂讲解平台治理
- 记者在采访前制作红旗问题清单
- NGO/公益组织准备消费者权益工作坊
- 学生团队申报创新创业、挑战杯、互联网+ 项目

## 架构图

![Architecture](assets/architecture.svg)

## 申报书 / BP

仓库包含用 `python-docx` 生成的 Word 版项目申报书：

```text
docs/innovation_project_bp.docx
```

内容包括项目背景、目标用户、创新点、技术路线、社会价值、实施计划、风险合规和预期成果。

## 路线图

- 增加多语言隐私政策规则包
- 增加不同法域的检查清单
- 增加 CSV 批量比较
- 增加公共议题报告模板

## License

MIT
