<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateGroupTranslationTable
 */
class CreateGroupTranslationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('translation_group_translation', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('translation_id')->unsigned()->index();
            $table->foreign('translation_id')->references('id')->on('translations')->onDelete('cascade');
            $table->integer('group_id')->unsigned()->index();
            $table->foreign('group_id')->references('id')->on('translation_groups')->onDelete('cascade');
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
        Schema::drop('translation_group_translation');
    }
}
