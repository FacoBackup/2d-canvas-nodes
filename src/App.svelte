<script lang="ts">
    import Material from "./shader-editor/lib/nodes/Material";
    import RGB from "./shader-editor/lib/nodes/RGB";
	import {onMount} from "svelte";
    import Canvas from "./shader-editor/lib/Canvas";
    import MakeVector from "./shader-editor/lib/nodes/MakeVector";
    import Comment from "./shader-editor/lib/nodes/Comment";

    const nodes = [new Material(), new MakeVector(), new RGB(), new RGB()]
	const canvas = new Canvas()
	onMount(() => {
        canvas.initialize(<HTMLCanvasElement>document.getElementById("canvas"))
        canvas.nodes.push(...nodes)
        canvas.clear()
	})
</script>


<div class="wrapper">
    <button on:click={() =>{
        canvas.comments.push(new Comment(10, 10))
        canvas.clear()
    }}>ADD COMMENT</button>
    <canvas id="canvas"></canvas>
</div>

<style>
    #canvas{
        left: 0;
        top: 0;
        z-index: 0;
        position: relative;
        box-shadow: var(--pj-boxshadow);
        color-rendering: optimizespeed;
        background: var(--pj-background-quaternary) radial-gradient(var(--pj-border-primary) 1px, transparent 0);
        background-size: 20px 20px;
    }
    .wrapper {
        z-index: 0;
        position: relative;

        overflow: hidden;

    }
</style>