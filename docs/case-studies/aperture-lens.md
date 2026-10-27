# 03 · 摄影镜头 / 断臂之美

让一只眼，替完整人像说话。

![APERTURE 桌面预览](../previews/aperture-lens.jpg)

[打开网页](../examples/aperture-lens/index.html) · [完整长页](../previews/aperture-lens-full.jpg) · [手机截图](../previews/aperture-lens-mobile.png) · [布局骨架](../previews/aperture-lens-skeleton.jpg)

## 设计问题

简单画一个大镜头仍是产品陈列，情绪与主题不足。

## 构图与信息的关系

保留摄影师的单眼、握持镜头的手和镜片局部，移除全貌；左侧留出短标题与行动，红色参数带补足产品背景。通过局部集中观看的情绪。

- 局部建立情绪重心
- 边界裁切强化观看
- 参数补足上下文

## 检查方法是否落实

原创新图刻意裁去完整头部与相机；骨架显示眼睛、镜片的取景范围，滑杆更新光圈几何示意和数值。

## 窄屏处理

文字区先完整呈现，局部影像在下方重新取景；参数与操作独立于图片。

## 实现定位

- 方法条目：源仓库 `references/visual-methods.md` 第 03 节。
- 网页：`docs/examples/aperture-lens/index.html`。
- 样式：`docs/assets/shared.css` 中标注为 03 的段落及响应式调整。
- 交互：`docs/assets/shared.js`。
- 图像素材与完整生成提示词：`docs/assets/art-prompts.json`。
- “布局骨架”只帮助检查当前设计结构，不代表未使用技能的对照实验。

## 独立复现用的场景简报

以下是后续复现的简报，不是本次迭代的逐字原始输入。

```text
用 $web-design-skill 的“断臂之美”为摄影镜头制作完整的视觉专题。保留摄影师的单眼、握持镜头的手和镜片局部，移除全貌；左侧留出短标题与行动，红色参数带补足产品背景。通过局部集中观看的情绪。 原创新图刻意裁去完整头部与相机；骨架显示眼睛、镜片的取景范围，滑杆更新光圈几何示意和数值。 使用匹配的原创素材，真实文字与按钮由 HTML 呈现，加入可切换的布局骨架。品牌与业务内容均为概念演示。
```

## 证据状态

当前创作会话加载技能后制作，经过同一会话的视觉检查与修正。部分艺术素材使用内置 image_gen 生成；它们对成品表现有直接影响。独立新会话复现与无技能盲评均未执行。

[实际网页验证记录](../verification.json) · [复现协议](../REPRODUCIBILITY.md) · [返回案例集](../index.html#cases)
