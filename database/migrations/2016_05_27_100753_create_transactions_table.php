<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateTransactionsTable
 */
class CreateTransactionsTable extends Migration
{
    use SchemaTrait;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('unique_no')->unique();
            $table->string('invoice_no');
            $table->string('pay_method');
            $table->string('type');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('amount');
            $table->boolean('is_payment_done')->default(false);
            $table->tinyInteger('attempts')->unsigned();
            $table->boolean('is_canceled')->default(false);
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
        $this->schema->drop('transactions');
    }
}