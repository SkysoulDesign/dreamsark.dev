<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateIdeasTable
 */
class CreateIdeasTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('ideas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned()->index()->unique();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->longText('content');

            $table->boolean('active')->default(true);
            $table->tinyInteger('fail_reason')->nullable();

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
        $this->schema->drop('ideas');
    }
}
