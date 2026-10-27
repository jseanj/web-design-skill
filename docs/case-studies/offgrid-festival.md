# 02 · 创意设计节 / 圆、方、三角

让圆、方、三角，长成一只灵感怪兽。

![OFF / GRID 桌面预览](../previews/offgrid-festival.jpg)

[打开网页](../examples/offgrid-festival/index.html) · [完整长页](../previews/offgrid-festival-full.jpg) · [手机截图](../previews/offgrid-festival-mobile.png) · [布局骨架](../previews/offgrid-festival-skeleton.jpg)

## 设计问题

几何元素只是标题旁边的装饰，议程仍是独立列表。

## 构图与信息的关系

以圆形躯干为主形，用三角耳朵与尾巴、圆形眼睛和方形纸腹组合角色；议程与日期都进入角色身体。用颜色与材质区分形态层级。

- 主圆决定整体轮廓
- 三角建立角色动势
- 方形纸腹承载真实议程

## 检查方法是否落实

日期切换更新怪兽腹部的菜单；切换骨架可直接看到主圆、三角与方形承载区的组合。

## 窄屏处理

角色整体缩放与重排，腹部保持可读；耳朵与手臂可局部越界，菜单和日期不可裁切。

## 实现定位

- 方法条目：源仓库 `references/visual-methods.md` 第 02 节。
- 网页：`docs/examples/offgrid-festival/index.html`。
- 样式：`docs/assets/shared.css` 中标注为 02 的段落及响应式调整。
- 交互：`docs/assets/shared.js`。
- 图像素材与完整生成提示词：`docs/assets/art-prompts.json`。
- “布局骨架”只帮助检查当前设计结构，不代表未使用技能的对照实验。

## 独立复现用的场景简报

以下是后续复现的简报，不是本次迭代的逐字原始输入。

```text
用 $web-design-skill 的“圆、方、三角”为创意设计节制作完整的视觉专题。以圆形躯干为主形，用三角耳朵与尾巴、圆形眼睛和方形纸腹组合角色；议程与日期都进入角色身体。用颜色与材质区分形态层级。 日期切换更新怪兽腹部的菜单；切换骨架可直接看到主圆、三角与方形承载区的组合。 使用匹配的原创素材，真实文字与按钮由 HTML 呈现，加入可切换的布局骨架。品牌与业务内容均为概念演示。
```

## 证据状态

当前创作会话加载技能后制作，经过同一会话的视觉检查与修正。部分艺术素材使用内置 image_gen 生成；它们对成品表现有直接影响。独立新会话复现与无技能盲评均未执行。

[实际网页验证记录](../verification.json) · [复现协议](../REPRODUCIBILITY.md) · [返回案例集](../index.html#cases)
