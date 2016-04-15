<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProfileQuestionnaireTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile_questionnaire', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('profile_id')->unsigned()->index();
            $table->foreign('profile_id')->references('id')->on('profile')->onDelete('cascade');
            $table->integer('questionnaire_id')->unsigned()->index();
            $table->foreign('questionnaire_id')->references('id')->on('questionnaire')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('profile_questionnaire');
    }
}
