<?php

namespace DreamsArk\Models\Payment;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transactions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['unique_no', 'invoice_no', 'pay_method', 'type', 'user_id', 'amount', 'is_payment_done', 'attempts', 'is_canceled'];

    /**
     * Relation to TransactionMessages Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasOne(Message::class);
    }

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
