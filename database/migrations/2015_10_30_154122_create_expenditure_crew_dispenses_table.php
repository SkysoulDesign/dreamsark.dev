<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateExpenditureCrewDispensesTable
 */
class CreateExpenditureCrewDispensesTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $this->schema->create('expenditure_crew_dispenses', function (Blueprint $table) {

            $table->increments('id');

            $table->string('type');
            $table->string('description');

            $table->string('amount');
            $table->integer('paid');

            $table->integer('crew_id')->unsigned()->nullable()->index();
            $table->foreign('crew_id')->references('id')->on('expenditure_crews');

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
        $this->schema->drop('expenditure_crew_dispenses');
    }
}
