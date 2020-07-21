import Alert from './alert.vue';
import Vue from 'vue';



Alert.newInstance = properties => {
    const props = properties || {};

    const Instance = new Vue({
        data: props,
        render(h) {
            return h(Alert, {
                props: props
            });
        }
    })

    const compont = Instance.$mount()

    document.body.appendChild(compont.$el)

    const alert = Instance.$childre[0]

    return {
        add(noticeProps) {
            alert.add(noticeProps);
        },
        remove(name) {
            alert.remove(name);
        }
    }

}

export default Alert;
