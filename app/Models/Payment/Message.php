<?php

namespace DreamsArk\Models\Payment;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Message
 *
 * @package DreamsArk\Models\Payment
 */
class Message extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transaction_message';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_id', 'request', 'response', 'remarks', 'vendor_remarks',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'request' => 'array',
        'response' => 'array'
    ];

    /**
     * Relation to Transaction Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
