<?php

use Illuminate\Database\Migrations\Migration;

class CreateProfileUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::create('profile_user', function (Blueprint $table) {
//            $table->increments('id');
//            $table->integer('user_id')->unsigned()->index();
//            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//            $table->integer('profile_id')->unsigned()->index();
//            $table->foreign('profile_id')->references('id')->on('profile')->onDelete('cascade');
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::drop('profile_user');
    }
}
