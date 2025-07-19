import { shallowRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export const lazy={
    install(app)
    {
        const targetIsVisible = shallowRef(false)
        app.directive('img-lazy', {
            mounted(el, binding) {
                useIntersectionObserver(
                    el,
                    ([entry]) => {
                        targetIsVisible.value = entry?.isIntersecting || false
                        if (targetIsVisible.value)
                            {
                                el.src = binding.value
                                stop()
                            }
                    },
                )
            }
        })
    }
}