<?php

namespace DreamsArk\Models\Payment;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use SkysoulDesign\Payment\PaymentBuilder;
use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class Transaction
 *
 * @package DreamsArk\Models\Payment
 */
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

    /**
     * @return PaymentBuilder
     */
    public function getPaymentResponse()
    {
        return app('payment')->forTransaction($this)->getResponse();
    }

    /**
     * Verify Payment Response
     *
     * @param Request $request
     * @return bool
     */
    public function verify(Request $request) : bool
    {
        return app('payment')->forTransaction($this)->verify($request->toArray());
    }

    /**
     * Returns payment confirmation response
     */
    public function getPaymentConfirmationResponse()
    {
        return app('payment')->forTransaction($this)->getConfirmationResponse();
    }

}
