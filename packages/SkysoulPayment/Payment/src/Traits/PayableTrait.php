<?php

namespace SkysoulDesign\Payment\Traits;

use SkysoulDesign\Payment\Payment;

/**
 * Class PaymentTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait PayableTrait
{

    /**
     * @var Payment
     */
    public $payment;

    /**
     * Boot this trait
     */
    protected static function bootPayableTrait()
    {
        /**
         * Bind on Loaded
         *
         * @param $model self
         */
        static::loaded(function (self $model) {
            static::bindPayment($model);
        });

        /**
         * Bind on Creating, so this way there is no need
         * to ->fresh a model after creation
         */
        static::created(function (self $model) {
            static::bindPayment($model);
        });
    }

    /**
     * Bind Payment Property
     *
     * @param $model
     */
    protected static function bindPayment($model)
    {
        $model->payment = app('payment', array($model));
    }

    /**
     * Create a new model instance that is existing.
     *
     * @param  array $attributes
     * @param  string|null $connection
     * @return static
     */
    public function newFromBuilder($attributes = [], $connection = null)
    {
        $instance = parent::newFromBuilder($attributes, $connection);

        $instance->fireModelEvent('loaded');

        return $instance;
    }

    /**
     * Register a loaded model event with the dispatcher.
     *
     * @param  \Closure|string $callback
     * @param  int $priority
     * @return void
     */
    public static function loaded($callback, $priority = 0)
    {
        static::registerModelEvent('loaded', $callback, $priority);
    }

}