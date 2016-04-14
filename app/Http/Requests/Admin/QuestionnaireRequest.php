<?php

namespace DreamsArk\Http\Requests\Admin;

use DreamsArk\Http\Requests\Request;

/**
 * Class QuestionnaireRequest
 * @package DreamsArk\Http\Requests\Admin
 */
class QuestionnaireRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if (in_array($this->request->get('type'), array('text', 'file', 'textarea', 'date'))) {
            $this->request->set('options', '');
        } else {
            $options = $this->request->get('options');
            $newOptionArr = array();
            if ($options) {
                foreach ($options as $key => $value) {
                    $newOptionArr[(is_int($key) ? strtolower(str_replace(array(' '), array('-'), $value)) : $key)] = $value;
                }
                $this->request->set('options', $newOptionArr);
            }
        }
        if($this->request->get('is_primary')=='on')
            $this->request->set('is_primary', 1);

        return [
            'question' => 'required',
            'type' => 'required',
            'options' => 'sometimes',
            'order' => 'required',
        ];
    }
}
