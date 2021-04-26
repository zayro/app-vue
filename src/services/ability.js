import {
    AbilityBuilder
} from '@casl/ability'

var user = JSON.parse(localStorage.getItem('user'))

function subjectName(item) {
    if (!item || typeof item === 'string' || !user) {
        return item
    } else if (item.created_by === user.id || user.is_admin === 1) {
        return 'app'
    }
}

export default AbilityBuilder.define({
    subjectName
}, can => {
    can(['read', 'create'], 'app')
    can(['update', 'delete'], 'app')
})
