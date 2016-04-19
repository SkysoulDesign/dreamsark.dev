<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateUserProfileQuestionnaireTable
 */
class CreateUserProfileQuestionnairesTable extends Migration
{
    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('profile_user_answer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('profile_id')->unsigned()->index();
            $table->foreign('profile_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->integer('question_id')->unsigned()->index();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
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
        $this->schema->drop('profile_user_answer');
    }
}
