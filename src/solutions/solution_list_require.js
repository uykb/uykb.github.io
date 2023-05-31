module.exports = function(name) {
    // switch...case... for pug template file.
    //   Intending to optimise webpack output files size.
    //   Because webpack will pack all files of the source folder 
    //   while using a variable value in command 'require'.
    switch(name) {
        case 'widgets/common_title_light':
            return require('../views/widgets/common_title_light.pug');
        case 'widgets/common_space':
            return require('../views/widgets/common_space.pug');
        case 'solutions/solution_image_left':
            return require('../views/solutions/solution_image_left.pug');
        case 'solutions/solution_image_right':
            return require('../views/solutions/solution_image_right.pug');
    }

    return require('../views/template_error.pug');
}
