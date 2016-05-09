<?php

namespace DreamsArk\Models\Master;

use DreamsArk\Models\Master\Question\Question;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Profile
 *
 * @package DreamsArk\Models\Profile
 */
class Profile extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profiles';

    /**
     * @var array
     */
    protected $fillable = ['name', 'display_name', 'description'];

    /**
     * Users Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class)->withPivot(['required', 'section_id'])->orderBy('section_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function answer()
    {
        return $this->hasOne(Answer::class)->where('answers.id', $this->pivot->answer_id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function answers()
    {
        return $this->answer->questions();
    }

//    /**
//     * @return mixed
//     */
//    public function getAnswerCountAttribute()
//    {
//        return $this->answer->questions()->count();
//    }

    /**
     * @return mixed
     */
    public function getQuestionCountAttribute()
    {
        return $this->questions()->count();
    }

    /**
     * Crew Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function crew()
    {
        return $this->hasMany(Crew::class, 'expenditure_profile_id');
    }

}
