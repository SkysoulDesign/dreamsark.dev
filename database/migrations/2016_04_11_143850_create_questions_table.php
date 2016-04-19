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
        $this->schema->drop('questions');
    }
}
