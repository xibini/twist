import { AcGameObject } from "@/assets/scripts/AcGameObject";
import { Wall } from "@/assets/scripts/Wall";
// 地图-棋盘图
export class GameMapObject extends AcGameObject {
    constructor(ctx, parent) { // ctx画布，parent画布的父元素，用来动态修改画布的长和宽
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0; // 一个格子的绝对距离，以后都用相对距离
        this.cols = 13; // 列数
        this.rows = 13; // 行数

        this.walls = []; // 所有的障碍物

        this.inner_wall_count = 20;
    }

    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }
        return false;
    }

    create_walls() {
        const g = []; // 存储是否是障碍物
        for ( let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }

        // 给四周加上墙壁
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for (let c = 1; c < this.cols - 1; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机障碍物
        for (let i = 0; i < this.inner_wall_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r] ) continue;
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2 )
                    continue;
                g[r][c] = g[c][r] = true;
                break;
            }

        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if(!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++ )
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
        }

        return true;
    }

    start() {
        for (let i = 0; i < 1000; i++) {
            if (this.create_walls())
                break;
        }

    }

    update() {
        this.update_size();
        this.render();
    }

    update_size() { // 更新矩形内部最大的正方形
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    render() { // 渲染
        const color_even = "#AAD751", color_odd = "#A2D149"; // 定义奇数格子和偶数格子的颜色
        for (let r = 0; r < this.rows; r++ ) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }

    }

}