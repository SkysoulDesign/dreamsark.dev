<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserProfileQuestionnaireTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profile_questionnaire', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('profile_id')->unsigned()->index();
            $table->foreign('profile_id')->references('id')->on('profile')->onDelete('cascade');
            $table->integer('questionnaire_id')->unsigned()->index();
            $table->foreign('questionnaire_id')->references('id')->on('questionnaire')->onDelete('cascade');
            $table->longText('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_profile_questionnaire');
    }
}
