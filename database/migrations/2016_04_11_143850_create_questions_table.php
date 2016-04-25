<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateQuestionsTable
 */
class CreateQuestionsTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $this->schema->create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('question');
            $table->integer('type_id')->unsigned()->index();
            $table->foreign('type_id')->references('id')->on('question_types')->onDelete('cascade');
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
        $this->schema->drop('questions');
    }
}
