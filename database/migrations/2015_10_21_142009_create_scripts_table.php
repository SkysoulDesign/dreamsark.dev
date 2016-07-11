<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateScriptsTable
 */
class CreateScriptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scripts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned()->index()->unique();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->longText('content');
            $table->boolean('active')->default(true);

            $table->integer('submission_id')->unsigned()->nullable()->index();
            $table->foreign('submission_id')->references('id')->on('submissions')->onDelete('cascade');

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
        Schema::drop('scripts');
    }
}
