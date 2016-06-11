<?php

namespace DreamsArk\Models\Payment;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use SkysoulDesign\Payment\Traits\PayableTrait;

/**
 * Class Transaction
 *
 * @package DreamsArk\Models\Payment
 */
class Transaction extends Model
{

    use PayableTrait;

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
    protected $fillable = [
        'unique_no', 'invoice_no', 'pay_method',
        'type', 'user_id', 'amount', 'is_payment_done', 'attempts', 'is_canceled'
    ];

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
     * Convert amount to fen
     *
     * @param $amount
     */
    public function setAmountAttribute($amount)
    {
        $this->attributes['amount'] = $amount * 1000;
    }

    /**
     * Convert amount back to yuan
     *
     * @param $amount
     * @return float
     */
    public function getAmountAttribute($amount)
    {
        return (float)$amount / 1000;
    }

    /**
     * User Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
