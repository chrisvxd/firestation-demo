import {ImageCell, TextCell, LongTextCell, SelectCell, DateCell, CurrencyCell, TimeSinceCell} from 'components/cells.jsx';
var Firebase = require('firebase');

var ref = new Firebase("https://firestation-demo.firebaseio.com/");

export default {
    auth: function (callback) {callback()},
    refs: [
        {
            ref: ref.child('pets'),
            title: 'The Pets',
            orderBy: 'size.weight',
            orderByDirection: 'asc',
            resolve: function (value, callback) {
                ref.child('owners').child(value.ownerKey).once('value', function (ownerSnapshot) {
                    value.owner = ownerSnapshot.val();
                    callback(value);
                })
            },
            children: [
                {
                    key: 'picture',
                    title: 'Profile Pic',
                    cell: ImageCell,
                    cellProps: {
                        width: '120',
                    },
                    canFilter: false
                },
                {
                    key: 'name',
                    cell: TextCell
                },
                {
                    key: 'size.diameter',
                    title: 'Height',
                    cell: TextCell
                },
                {
                    key: 'size.length',
                    title: 'Length',
                    cell: TextCell
                },
                {
                    key: 'size.weight',
                    title: 'Weight',
                    cell: TextCell,
                    canWrite: true
                },
                {
                    key: 'owner.name',
                    title: 'Owner',
                    cell: TextCell
                },
                {
                    key: 'bio',
                    cell: LongTextCell,
                    canWrite: true
                },
                {
                    key: 'species',
                    cell: SelectCell,
                    cellProps: {
                        options: [
                            {
                                value: 'cat',
                                title: 'Cat'
                            },
                            {
                                value: 'dog',
                                title: 'Dog'
                            }
                        ]
                    },
                    canWrite: true
                }
            ]
        },
        {
            ref: ref.child('owners'),
            title: 'The Owners',
            resolve: function (val, callback) {  // Custom firebase resolve method
                val.calculatedLaziness = ((1 - val.activity_level) * 100).toString() + '%';
                callback(val);
            },
            children: [
                {
                    key: 'name',
                    cell: TextCell,
                    canWrite: true
                },
                {
                    key: 'calculatedLaziness',
                    title: 'Laziness (Calculated)',
                    cell: TextCell
                }
            ]
        }
    ]
}
