@servers(['web' => 'root@139.196.36.204'])

@macro('reset')
    remove-clone
    reset-db
@endmacro

@task('install')
    cd /home/dreamsark.dev
    git checkout .
    git pull origin master
    composer self-update
    composer install
@endtask

@task('update')
    cd /home/dreamsark.dev
    git checkout .
    git pull origin master
    composer self-update
    composer update
@endtask

@task('config-git')
    git config --global user.email "rafael@skysoul.com.au"
    git config --global user.name "Rafael"
@endtask

@task('refresh')
    cd /home/dreamsark.dev
    php artisan migrate:refresh --seed
@endtask

@task('remove-clone')
    cd /home
    sudo rm -r -f dreamsark.dev
    git clone https://github.com/SkysoulDesign/Dreamsark.git dreamsark.dev
@endtask

@task('reset-db')
    mysql -uroot -p478135
    drop database dreamsark;
    drop database dreamsark_report;
    drop database dreamsark_translation;
    create database dreamsark;
    create database dreamsark_report;
    create database dreamsark_translation;
@endtask
