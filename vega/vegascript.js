require.config({
    paths: {
        "nbextensions/jupyter-vega/index": "vscode-resource://file///Users/penlv/code/vscode/extensions/notebook-test/dist/jupyter-vega/index.js"
    }
});

(function(element) {
    const spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json", "width": 400, "height": 200, "padding": 5, "data": [{ "name": "table", "values": [{ "category": "A", "amount": 28 }, { "category": "B", "amount": 55 }, { "category": "C", "amount": 43 }, { "category": "D", "amount": 91 }, { "category": "E", "amount": 81 }, { "category": "F", "amount": 53 }, { "category": "G", "amount": 19 }, { "category": "H", "amount": 87 }] }], "signals": [{ "name": "tooltip", "value": {}, "on": [{ "events": "rect:mouseover", "update": "datum" }, { "events": "rect:mouseout", "update": "{}" }] }], "scales": [{ "name": "xscale", "type": "band", "domain": { "data": "table", "field": "category" }, "range": "width", "padding": 0.05, "round": true }, { "name": "yscale", "domain": { "data": "table", "field": "amount" }, "nice": true, "range": "height" }], "axes": [{ "orient": "bottom", "scale": "xscale" }, { "orient": "left", "scale": "yscale" }], "marks": [{ "type": "rect", "from": { "data": "table" }, "encode": { "enter": { "x": { "scale": "xscale", "field": "category" }, "width": { "scale": "xscale", "band": 1 }, "y": { "scale": "yscale", "field": "amount" }, "y2": { "scale": "yscale", "value": 0 } }, "update": { "fill": { "value": "steelblue" } }, "hover": { "fill": { "value": "red" } } } }, { "type": "text", "encode": { "enter": { "align": { "value": "center" }, "baseline": { "value": "bottom" }, "fill": { "value": "#333" } }, "update": { "x": { "scale": "xscale", "signal": "tooltip.category", "band": 0.5 }, "y": { "scale": "yscale", "signal": "tooltip.amount", "offset": -2 }, "text": { "signal": "tooltip.amount" }, "fillOpacity": [{ "test": "datum === tooltip", "value": 0 }, { "value": 1 }] } } }]
    };
    const opt = {};
    const type = "vega";
    const id = "2a522180-bd9f-476c-b4f0-5e6311bccbc3";
    
    const output_area = this;
    
    require(["nbextensions/jupyter-vega/index"], function (vega) {
        const target = document.createElement("div");
        target.id = id;
        target.className = "vega-embed";
    
        const style = document.createElement("style");
        style.textContent = [
            ".vega-embed .error p {",
            "  color: firebrick;",
            "  font-size: 14px;",
            "}",
        ].join("\\\\n");
    
        // element is a jQuery wrapped DOM element inside the output area
        // see http://ipython.readthedocs.io/en/stable/api/generated/\\
        // IPython.display.html#IPython.display.Javascript.__init__
        element[0].appendChild(target);
        element[0].appendChild(style);
    
        vega.render("#" + id, spec, type, opt, output_area);
    }, function (err) {
        if (err.requireType !== "scripterror") {
            throw (JSON.stringify(err));
        }
    });
}).call({ outputs: ["#vegatest"] }, [document.getElementById("vegatest")]);
