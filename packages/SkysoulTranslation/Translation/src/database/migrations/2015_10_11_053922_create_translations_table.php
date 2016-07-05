<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateTranslationsTable
 */
class CreateTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('language_id')->unsigned()->index();
            $table->foreign('language_id')->references('id')->on('translation_languages')->onDelete('cascade');
            $table->string('key');
            $table->string('value')->nullable();
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
        Schema::drop('translations');
    }
}
