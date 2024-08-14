import Door from "./Door.js";
import { MathUtils } from "https://cdn.jsdelivr.net/npm/three@v0.167.1/build/three.module.js";

export default class DoorUI {
    /** высота @type {HTMLInputElement} */
    #height;
    /** ширина @type {HTMLInputElement} */
    #width;
    /** толщина @type {HTMLInputElement} */
    #thickness;
    /** @type {Door} */
    #door;

    /** @param {Door} door  */
    constructor (door) {
        this.#height = document.getElementById("height");
        this.#width = document.getElementById("width");
        this.#thickness = document.getElementById("thickness");
        this.#door = door;

        // const size = this.#door.size;
        // this.#height.value = size.y.toFixed(2);
        // this.#width.value = size.x.toFixed(2);
        // this.#thickness.value = size.z.toFixed(2);
        this.#height.addEventListener("input", this.#setHeight.bind(this));
        this.#width.addEventListener("input", this.#setWidth.bind(this));
        this.#thickness.addEventListener("input", this.#setThickness.bind(this));
    }

    /** @param {Event} e */
    #setHeight (e) {
        if (e.target.value === "." || e.target.value === "," || e.target.value === "") return;
        let number = +e.target.value;
        number = MathUtils.clamp(number, +e.target.min, +e.target.max);
        e.target.value = number;
        this.#door.height = number;
    }

    /** @param {Event} e */
    #setWidth (e) {
        if (e.target.value === "." || e.target.value === "," || e.target.value === "") return;
        let number = +e.target.value;
        number = MathUtils.clamp(number, +e.target.min, +e.target.max);
        e.target.value = number;
        this.#door.width = number;
    }

    /** @param {Event} e */
    #setThickness (e) {
        if (e.target.value === "." || e.target.value === "," || e.target.value === "") return;
        let number = +e.target.value;
        number = MathUtils.clamp(number, +e.target.min, +e.target.max);
        e.target.value = number;
        this.#door.thickness = number;
    }
}
