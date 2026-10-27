# 05 · 城市跑团 / 乾坤大挪移

把信息面板，旋转成一张起跑通行证。

![SHIFT RUN CLUB 桌面预览](../previews/shift-running.jpg)

[打开网页](../examples/shift-running/index.html) · [完整长页](../previews/shift-running-full.jpg) · [手机截图](../previews/shift-running-mobile.png) · [布局骨架](../previews/shift-running-skeleton.jpg)

## 设计问题

只把背景切斜，内容仍像普通运动落地页。

## 构图与信息的关系

整体旋转纸质通行证，平移其重心，在纸面上组织路线、距离与集合信息；让真实感跑者跨出纸边，与背景跑道建立前后关系。

- 整体信息平面旋转
- 人物跨越平面边界
- 路径与行动组成通行证

## 检查方法是否落实

切换路线会更新纸上的距离和集合信息；骨架可直接辨认旋转的承载平面与人物越界区。

## 窄屏处理

跑者移到纸面上方，纸面只保留轻微角度，路线与行动继续在纸内。

## 实现定位

- 方法条目：源仓库 `references/visual-methods.md` 第 05 节。
- 网页：`docs/examples/shift-running/index.html`。
- 样式：`docs/assets/shared.css` 中标注为 05 的段落及响应式调整。
- 交互：`docs/assets/shared.js`。
- 图像素材与完整生成提示词：`docs/assets/art-prompts.json`。
- “布局骨架”只帮助检查当前设计结构，不代表未使用技能的对照实验。

## 独立复现用的场景简报

以下是后续复现的简报，不是本次迭代的逐字原始输入。

```text
用 $web-design-skill 的“乾坤大挪移”为城市跑团制作完整的视觉专题。整体旋转纸质通行证，平移其重心，在纸面上组织路线、距离与集合信息；让真实感跑者跨出纸边，与背景跑道建立前后关系。 切换路线会更新纸上的距离和集合信息；骨架可直接辨认旋转的承载平面与人物越界区。 使用匹配的原创素材，真实文字与按钮由 HTML 呈现，加入可切换的布局骨架。品牌与业务内容均为概念演示。
```

## 证据状态

当前创作会话加载技能后制作，经过同一会话的视觉检查与修正。部分艺术素材使用内置 image_gen 生成；它们对成品表现有直接影响。独立新会话复现与无技能盲评均未执行。

[实际网页验证记录](../verification.json) · [复现协议](../REPRODUCIBILITY.md) · [返回案例集](../index.html#cases)
