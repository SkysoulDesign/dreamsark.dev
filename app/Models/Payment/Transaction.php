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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'paid' => 'boolean',
        'is_canceled' => 'boolean',
    ];

    /**
     * Convert amount to fen
     *
     * @param $amount
     */
    public function setAmountAttribute($amount)
    {
        $this->attributes['amount'] = $amount * config('payment.base');
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

    /**
     * Relation to TransactionMessages Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function message()
    {
        return $this->hasOne(Message::class);
    }

}
