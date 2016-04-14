<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuestionnaireTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionnaire', function (Blueprint $table) {
            $table->increments('id');
            $table->string('question');
            $table->string('category')->nullable();
            $table->boolean('description')->nullable();
            $table->string('type');
            $table->longText('options')->nullable();
            $table->integer('order')->unsigned();
            $table->boolean('is_primary')->default(0);

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
        Schema::drop('questionnaire');
    }
}
