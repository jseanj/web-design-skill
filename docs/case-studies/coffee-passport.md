# 01 · 咖啡订阅 / 抄现实

把世界，真正装进一杯。

![ORIGIN CLUB 桌面预览](../previews/coffee-passport.jpg)

[打开网页](../examples/coffee-passport/index.html) · [完整长页](../previews/coffee-passport-full.jpg) · [手机截图](../previews/coffee-passport-mobile.png) · [布局骨架](../previews/coffee-passport-skeleton.jpg)

## 设计问题

普通品牌介绍难以让“产地旅程”成为页面整体体验。

## 构图与信息的关系

先提炼咖啡杯的杯口、杯身、把手与杯碟，产地、风味、烘焙档案和行动进入杯身；三张产地票签依附杯侧。再用原创建模感环境建立前后景。

- 杯体轮廓承载内容
- 票签与产地一一对应
- 内容成立后补材质与前后景

## 检查方法是否落实

切换产地会更新杯内档案。切换“布局骨架”后仍能辨认杯体及各内容分区，说明载体参与了信息组织。

## 窄屏处理

杯体收窄，产地票签转到杯口上方；杯把与杯碟保留识别，背景可以裁切。

## 实现定位

- 方法条目：源仓库 `references/visual-methods.md` 第 01 节。
- 网页：`docs/examples/coffee-passport/index.html`。
- 样式：`docs/assets/shared.css` 中标注为 01 的段落及响应式调整。
- 交互：`docs/assets/shared.js`。
- 图像素材与完整生成提示词：`docs/assets/art-prompts.json`。
- “布局骨架”只帮助检查当前设计结构，不代表未使用技能的对照实验。

## 独立复现用的场景简报

以下是后续复现的简报，不是本次迭代的逐字原始输入。

```text
用 $web-design-skill 的“抄现实”为咖啡订阅制作完整的视觉专题。先提炼咖啡杯的杯口、杯身、把手与杯碟，产地、风味、烘焙档案和行动进入杯身；三张产地票签依附杯侧。再用原创建模感环境建立前后景。 切换产地会更新杯内档案。切换“布局骨架”后仍能辨认杯体及各内容分区，说明载体参与了信息组织。 使用匹配的原创素材，真实文字与按钮由 HTML 呈现，加入可切换的布局骨架。品牌与业务内容均为概念演示。
```

## 证据状态

当前创作会话加载技能后制作，经过同一会话的视觉检查与修正。部分艺术素材使用内置 image_gen 生成；它们对成品表现有直接影响。独立新会话复现与无技能盲评均未执行。

[实际网页验证记录](../verification.json) · [复现协议](../REPRODUCIBILITY.md) · [返回案例集](../index.html#cases)
