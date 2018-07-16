const TYPE = {
    DROP: Symbol('TYPE_DROP'),
    PASTE: Symbol('TYPE_PASTE'),
    INPUT: Symbol('TYPE_INPUT'),
    CLIPBOARD: Symbol('TYPE_CLIPBOARD'),
    AUTO_CLIPBOARD: Symbol('TYPE_AUTO_CLIPBOARD')
}

const HANDLE = {
    SEARCH: Symbol('HANDLE_SEARCH'),
    YOUTUBE: Symbol('HANDLE_YOUTUBE'),
    HYDRATE: Symbol('HANDLE_HYDRATE')
}

const MODIFIER = {
    NOW: Symbol('MODIFIER_NOW'),
    NEXT: Symbol('MODIFIER_NEXT'),
    QUEUE: Symbol('MODIFIER_QUEUE')
}

export {
    TYPE,
    HANDLE,
    MODIFIER
}