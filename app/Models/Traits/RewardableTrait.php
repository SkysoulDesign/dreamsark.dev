<?php
namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Reward;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * Class RewardableTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait RewardableTrait
{
    /**
     * @return mixed
     */
    public function reward() : MorphOne
    {
        return $this->morphOne(Reward::class, 'rewardable');
    }

}
