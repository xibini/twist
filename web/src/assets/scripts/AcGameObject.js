const AC_GAME_OBJECTS = [] // 所有游戏对象存储到该游戏列表里

export class AcGameObject { // 游戏对象基类
    constructor() {
        AC_GAME_OBJECTS.push(this) // 将当前游戏对象存储到游戏列表里
        this.timedelta = 0; // 这一帧执行的时刻与上一帧执行的时刻的时间间隔
        this.has_called_start = false; // 是否执行过start()
    }

    start() { // 只执行一次

    }

    update() { // 每一帧执行一次，除了第一次外

    }

    on_destroy() { // 删除前执行

    }

    destroy() { // 删除当前对象
        this.on_destroy()
        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if (obj == this) {
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }

}

let last_timestamp; // 上一次执行的时刻
const step = timestamp => { // 传入参数timestamp表示当前执行的时刻
        for (let obj of AC_GAME_OBJECTS) {
            if (!obj.has_called_start) {
                obj.has_called_start = true;
                obj.start();
            }
            else {
                obj.timedelta = last_timestamp - timestamp;
                obj.update();
            }
        }
        last_timestamp = timestamp;
        requestAnimationFrame(step)
}

requestAnimationFrame(step)